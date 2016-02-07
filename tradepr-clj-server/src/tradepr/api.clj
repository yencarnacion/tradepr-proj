(ns tradepr.api
  (:require [tradepr.db :refer [pool]]
            [tradepr.utility :refer [parse-number]]
            [clojure.java.jdbc :as db]
            [jdbc.pool.c3p0 :as pool]
            [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.json :as ring-json]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.util.response :as resp]
            [ring.logger :as logger]
            ))

(defn tradepr [] (db/query pool ["SELECT * FROM \"IMPORT_HTS10_ALL\" LIMIT 10"]))

;; TODO Problem with sql injection
(defn- importExportSqlString [iore] (str "select country, sum(value) as su from " iore " where year=? and month=? group by country order by su DESC"))

(defn- monthImportExport [ioresql year month] (db/query pool [ioresql year month]))

(defn- monthexport [year month] (monthImportExport (importExportSqlString "\"EXPORT_HTS10_ALL\"") year month))
(defn- monthimport [year month] (monthImportExport (importExportSqlString "\"IMPORT_HTS10_ALL\"") year month))

(defn- topmonthimportexport [import top year month]
  (let [f (if import monthimport monthexport)]
    (concat
     (take top (f year month))
     (let [others (reduce + 0 (map :su (drop top (f year month))))]
       (list {:country "Others" :su others})))))

(defn- topmonthimport [top year month] (topmonthimportexport true top year month))
(defn- topmonthexport [top year month] (topmonthimportexport false top year month))

(defn toptrading [top year month] {:topimports (topmonthimport top year month)
                                   :topexports (topmonthexport top year month)})

(defroutes app-routes
  (GET "/" [] (resp/content-type (resp/resource-response "index.html" {:root "public"}) "text/html"))
  (GET "/api/tradepr" [] (resp/content-type (resp/response (tradepr)) "application/json; charset=utf-8"))
  (GET "/api/tradepr/toptrading/:year/:month" [year month] (resp/content-type (resp/response (toptrading 15 (parse-number year) (parse-number month))) "application/json; charset=utf-8"))
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (-> app-routes
      (wrap-defaults site-defaults)
      (wrap-cors :access-control-allow-origin [#".*"]
                  :access-control-allow-methods [:get :put :post :delete])
      (ring-json/wrap-json-response)
      (logger/wrap-with-logger)
  ))

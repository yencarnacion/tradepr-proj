(ns tradepr.db
  (:require [clojure.java.jdbc :as db]
            [jdbc.pool.c3p0 :as c3p0]
            ))

;; URI follows http://www.ietf.org/rfc/rfc2396.txt
(def db-uri
  (java.net.URI. (or
    (System/getenv "DATABASE_URL")
    "postgresql://tradepr-project:tradepr-project@localhost:5432/tradepr-project")))

(def user-and-password
  (if (nil? (.getUserInfo db-uri))
    nil (clojure.string/split (.getUserInfo db-uri) #":")))

(def pool 
  (c3p0/make-datasource-spec
    {:classname "org.postgresql.Driver"
    :subprotocol "postgresql"
    :user (get user-and-password 0)
    :password (get user-and-password 1)
    :subname (if (= -1 (.getPort db-uri))
                (format "//%s%s" (.getHost db-uri) (.getPath db-uri))
                (format "//%s:%s%s" (.getHost db-uri) (.getPort db-uri) (.getPath db-uri)))
   :initial-pool-size 10
   :max-pool-idle 3
   :max-pool-size 20
   :min-pool-size 3
   }))


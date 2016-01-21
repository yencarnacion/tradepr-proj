(ns tradepr.core
  (:gen-class)
  (:require [tradepr.api :as tradepr.api]
            [ring.adapter.jetty :as jetty]))

(defn -main []
  (jetty/run-jetty tradepr.api/app {:port 3000}))

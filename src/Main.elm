module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Events exposing (onClick)
import App exposing (Model, Msg, init, update, view)


-- MAIN


main : Program () Model Msg
main =
    Browser.fullscreen
        { init = init
        , update = update
        , view = \m -> Browser.Page "Webpack starter" [ view m ]
        , onNavigation = Nothing
        , subscriptions = \_ -> Sub.none
        }

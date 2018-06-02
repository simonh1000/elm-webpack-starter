module Main exposing (main)

import Browser
import App exposing (..)


main : Program () Model Msg
main =
    Browser.fullscreen
        { init = init
        , update = update
        , view = \m -> Browser.Page "Webpack starter" [ view m ]
        , onNavigation = Just navigationHandler
        , subscriptions = \_ -> Sub.none
        }

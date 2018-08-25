module Main exposing (main)

import App exposing (..)
import Browser


main : Program Int Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view =
            \m ->
                { title = "Webpack starter"
                , body = [ view m ]
                }
        , subscriptions = \_ -> Sub.none
        }

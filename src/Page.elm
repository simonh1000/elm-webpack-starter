module Page exposing (..)

import Html exposing (a, p, text)
import Html.Attributes exposing (class, href)


view =
    p []
        [ text "And now don't forget to add a star to the Github repo "
        , a
            [ href "https://github.com/simonh1000/elm-webpack-starter"
            , class "underline"
            ]
            [ text "elm-webpack-starter" ]
        , text " ;-)"
        ]

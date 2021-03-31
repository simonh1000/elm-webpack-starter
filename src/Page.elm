module Page exposing (..)

{- This is just a subpage to check that the watchers for recompiling work -}

import Html exposing (Html, a, p, text)
import Html.Attributes exposing (class, href)


view : Html msg
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

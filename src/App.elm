module App exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Browser.Navigation as Nav
import Url exposing (Url)
import Url.Parser as UrlParser


type alias Model =
    Int


init : Int -> ( Model, Cmd Msg )
init _ =
    ( 7, Cmd.none )



-- -- URL Parsing and Routing
--
--
-- navigationHandler : Url -> Msg
-- navigationHandler =
--     urlParser >> Set
--
--
-- urlParser : Url -> Int
-- urlParser url =
--     url
--         |> UrlParser.parse UrlParser.int
--         |> Maybe.withDefault 0
--


-- UPDATE


type Msg
    = Inc
    | Set Int


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Inc ->
            ( add1 model, Cmd.none )

        Set m ->
            ( m, Cmd.none )


{-| increments the counter

    add1 5 --> 6

-}
add1 : Model -> Model
add1 model =
    model + 1



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ header []
            [ img [ src "images/logo.png" ] []
            , h1 [] [ text "Elm 0.19 Webpack Starter, featuring hot-loading" ]
            ]
        , p [] [ text "Click on the button below to increment the state." ]
        , div []
            [ button
                [ class "pure-button pure-button-primary"
                , onClick Inc
                ]
                [ text "+ 1" ]
            , text <| String.fromInt model
            ]
        , p [] [ text "Then make a change to the source code and see how the state is retained after you recompile." ]
        , p []
            [ text "And now don't forget to add a star to the Github repo "
            , a [ href "https://github.com/simonh1000/elm-webpack-starter" ] [ text "elm-webpack-starter" ]
            ]
        ]

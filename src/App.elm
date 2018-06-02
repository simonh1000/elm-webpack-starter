module App exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Model =
    Int


init : ( Model, Cmd Msg )
init =
    ( 0, Cmd.none )



-- UPDATE


type Msg
    = Inc


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Inc ->
            ( add1 model, Cmd.none )


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
            , h1 [] [ text "Elm Webpack Starter, featuring hot-loading" ]
            ]
        , p [] [ text "Click on the button below to increment the state." ]
        , div []
            [ button
                [ class "pure-button pure-button-primary"
                , onClick Inc
                ]
                [ text "+ 1" ]
            , text <| toString model
            ]
        , p [] [ text "Then make a change to the source code and see how the state is retained after you recompile." ]
        , p []
            [ text "And now don't forget to add a star to the Github repo "
            , a [ href "https://github.com/simonh1000/elm-webpack-starter" ] [ text "elm-webpack-starter" ]
            ]
        ]

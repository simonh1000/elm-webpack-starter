module App exposing (..)

import Html exposing (Html, div, text, h1, p, button)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)


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
            (model + 1) ! []



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ h1 [] [ text "Hot loading" ]
        , p [] [ text "Click on the button below to increment the state. Then make a change to the source code and see how the state is retained after you recompile." ]
        , p [] [ text <| toString model ]
        , button
            [ class "btn btn-primary"
            , onClick Inc
            ]
            [ text "+ 1" ]
        ]

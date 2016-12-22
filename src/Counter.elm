module Counter exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


-- MODEL


type alias Model =
    Int


init : Model
init =
    0



-- UPDATE


type Msg
    = Increment
    | Decrement


update : Msg -> Model -> Model
update message model =
    case message of
        Increment ->
            model + 1

        Decrement ->
            model - 1



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ button
            [ class "btn btn-primary"
            , onClick Decrement
            ]
            [ text "-" ]
        , div [ countStyle ] [ text (toString model) ]
        , button
            [ class "btn btn-primary"
            , onClick Increment
            ]
            [ text "+" ]
        ]


countStyle : Attribute a
countStyle =
    style
        [ ( "font-size", "20px" )
        , ( "font-family", "monospace" )
        , ( "display", "inline-block" )
        , ( "width", "50px" )
        , ( "text-align", "center" )
        ]

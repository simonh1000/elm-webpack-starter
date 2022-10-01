port module Main exposing (Model, Msg(..), add1, init, main, toJs, update, view)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Http exposing (Error(..))
import Json.Decode as Decode



-- ---------------------------
-- PORTS
-- ---------------------------


port toJs : String -> Cmd msg



-- ---------------------------
-- MODEL
-- ---------------------------


type alias Model =
    { counter : Int
    , serverMessage : String
    }


init : Int -> ( Model, Cmd Msg )
init flags =
    ( { counter = flags, serverMessage = "" }, Cmd.none )



-- ---------------------------
-- UPDATE
-- ---------------------------


type Msg
    = Inc
    | TestServer
    | OnServerResponse (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        Inc ->
            ( add1 model, toJs "Inc" )

        TestServer ->
            let
                expect =
                    Http.expectJson OnServerResponse (Decode.field "result" Decode.string)
            in
            ( model
            , Http.get { url = "/test", expect = expect }
            )

        OnServerResponse res ->
            case res of
                Ok r ->
                    ( { model | serverMessage = r }, Cmd.none )

                Err err ->
                    ( { model | serverMessage = "Error: " ++ httpErrorToString err }, Cmd.none )


httpErrorToString : Http.Error -> String
httpErrorToString err =
    case err of
        BadUrl url ->
            "BadUrl: " ++ url

        Timeout ->
            "Timeout"

        NetworkError ->
            "NetworkError"

        BadStatus _ ->
            "BadStatus"

        BadBody s ->
            "BadBody: " ++ s


{-| increments the counter

    add1 5 --> 6

-}
add1 : Model -> Model
add1 model =
    { model | counter = model.counter + 1 }



-- ---------------------------
-- VIEW
-- ---------------------------


view : Model -> Html Msg
view model =
    div [ class "container p-2" ]
        [ header [ class "grid-cols-3" ]
            [ span [] [ img [ src "/images/logo.png" ] [] ]
            , div [] [ span [ class "icon" ] [] ]
            , h1 [ class "text-2xl font-bold ml-2" ] [ text "Elm 0.19.1 Webpack Starter, with hot-reloading" ]
            ]
        , p [] [ text "Click on the button below to increment the state." ]
        , div [ class "flex flex-row justify-between" ]
            [ div [ class "flex flex-row items-center" ]
                [ button
                    [ class "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    , onClick Inc
                    ]
                    [ text "+ 1" ]
                , text <| String.fromInt model.counter
                ]
            , div [ class "flex flex-row items-center" ]
                [ text model.serverMessage
                , button
                    [ class "border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    , onClick TestServer
                    ]
                    [ text "ping dev server" ]
                ]
            ]
        , p [] [ text "Then make a change to the source code and see how the state is retained after recompilation." ]
        ]



-- ---------------------------
-- MAIN
-- ---------------------------


main : Program Int Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , view =
            \m ->
                { title = "[title] Elm 0.19.1 starter"
                , body = [ view m ]
                }
        , subscriptions = \_ -> Sub.none
        }

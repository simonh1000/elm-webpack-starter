module Main exposing (main)

import Html
import App exposing (init, update, view)


main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }



-- HOT LOADER
-- After hot swapping, elm-hot-load will call 'swap' port to trigger a re-render.
-- port swap : Signal Bool
--
-- swapsignal : Signal Action
-- swapsignal =
--   Signal.map (\_ -> Empty) swap
--
-- -- Used by default example
-- port logs : Signal String
-- port logs = logMailbox.signal

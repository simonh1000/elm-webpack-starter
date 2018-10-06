module Example exposing (fuzzTest, unitTest)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Main exposing (..)
import Test exposing (..)



-- import Test.Html.Query as Query
-- import Test.Html.Selector exposing (tag, text)


{-| See <https://github.com/elm-community/elm-test>
-}
unitTest : Test
unitTest =
    describe "simple unit test"
        [ test "Inc adds one" <|
            \() ->
                update Inc (Model 0 "")
                    |> Tuple.first
                    |> .counter
                    |> Expect.equal 1
        ]


{-| See <https://github.com/elm-community/elm-test>
-}
fuzzTest : Test
fuzzTest =
    describe "simple fuzz test"
        [ fuzz int "Inc ALWAYS adds one" <|
            \ct ->
                update Inc (Model ct "")
                    |> Tuple.first
                    |> .counter
                    |> Expect.equal (ct + 1)
        ]



-- {-| see <https://github.com/eeue56/elm-html-test>
-- -}
-- viewTest : Test
-- viewTest =
--     describe "Testing view function"
--         [ test "Button has the expected text" <|
--             \() ->
--                 view 0
--                     |> Query.fromHtml
--                     |> Query.find [ tag "button" ]
--                     |> Query.has [ text "+ 1" ]
--         ]

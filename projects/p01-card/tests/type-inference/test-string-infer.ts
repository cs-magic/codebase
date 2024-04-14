const inferStringGeneric = <T extends string | number | boolean | object>(
  v: T,
) => {
  return (s: T) => {
    console.log({ s })
  }
}

// ok
inferStringGeneric("foo")("foo")

// I want this to pass, if the function accepts a string input, so it can be inferred as accepting any string
// TS2345: Argument of type  "bar"  is not assignable to parameter of type  "foo"
// inferStringGeneric("foo")("bar")

// ok
inferStringGeneric(0)(0)

// I want this to pass, if the function accepts a number input, so it can be inferred as accepting any number
// TS2345: Argument of type  1  is not assignable to parameter of type  0
// inferStringGeneric(0)(1)

// ok
inferStringGeneric({ hello: "world" })({ hello: "bar" })

// TS2353: Object literal may only specify known properties, and  'foo'  does not exist in type  { hello: string; }
// inferStringGeneric({ hello: "world" })({ foo: "bar" })

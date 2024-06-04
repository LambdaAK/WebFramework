import { Maybe, none, some } from "./util/maybe"
import { lex } from "./lexer/Lexer"

import { L9Expr } from "./AST/expr/L9"
import { exprParser } from "./parser/expr/L9"
import { typeL4Parser } from "./parser/type/TypeL4"
import { typeL1Parser } from "./parser/type/TypeL1"

const s: string = "a -> b -> c -> d"

const tokens = lex(s)

const nodeMaybe = typeL4Parser(tokens)

if (nodeMaybe.type === 'None') {
  console.log('parse error')
}

else {
  const node = nodeMaybe.value[0]
  console.dir(node, { depth: null })
  //console.log(stringOfNode(node))
}

export const lexAndParse = (s: string): Maybe<L9Expr> => {
  const tokens = lex(s)
  const nodeMaybe = exprParser(tokens)
  if (nodeMaybe.type === 'None') {
    return {
      type: 'None'
    }
  }
  else {
    const node = nodeMaybe.value[0]
    return {
      type: 'Some',
      value: node
    }
  }
}
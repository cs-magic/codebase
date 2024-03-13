import { Fragment, cloneElement, isValidElement } from "react"

export const JoinComponents = ({
  components,
  separator,
}: {
  components: React.ReactNode[] // Array of React nodes to join
  separator: React.ReactNode // Separator to use between each pair of components
}) => {
  return (
    <>
      {components
        .filter((c) => !!c)
        .map((component, index) => {
          return (
            <Fragment key={index}>
              {component}
              {index < components.length - 1 && isValidElement(separator)
                ? cloneElement(separator, { key: `separator-${index}` })
                : null}
            </Fragment>
          )
        })}
    </>
  )
}
export default JoinComponents

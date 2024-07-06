import { cloneElement, Fragment, isValidElement } from "react"

export const JoinComponents = ({
  components,
  separator,
}: {
  components: React.ReactNode[] // Array of React nodes to join
  separator: React.ReactNode // Separator to use between each pair of components
}) => {
  const components_ = components.filter((c) => !!c)

  return (
    <>
      {components_.map((component, index) => {
        return (
          <Fragment key={index}>
            {component}
            {index < components_.length - 1 && isValidElement(separator)
              ? cloneElement(separator, { key: `separator-${index}` })
              : null}
          </Fragment>
        )
      })}
    </>
  )
}
export default JoinComponents

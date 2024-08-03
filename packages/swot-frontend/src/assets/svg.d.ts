/**
 * ref: https://stackoverflow.com/a/45887328/9422455
 */
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

import { Plugin } from 'esbuild'
import { BARE_IMPORT_RE, EXTERNAL_TYPES } from './constants'
export function scanPlugin(deps: Set<string>): Plugin {
  console.log('scanPlugin')

  return {
    name: 'scanPlugin',
    setup(build) {
      build.onResolve(
        { filter: new RegExp(`\\.(${EXTERNAL_TYPES.join('|')})$`) }, //将externalTypes中的类型全部过滤，不经过esbuild的解析,external:true
        (args) => {
          return { path: args.path, external: true }
        }
      )
      build.onResolve(
        { filter: BARE_IMPORT_RE }, //将以@或者字母开头的包名过滤
        (args) => {
          console.log(args.path)

          deps.add(args.path) //将依赖npm包名加入到deps中
          return { path: args.path, external: true }
        }
      )
    },
  }
}

import { Plugin, TransformResult } from 'vite'
import { describe, expect, it } from 'vitest'
import functionLogger from './vite-plugin-function-logger'

describe('vite-plugin-function-logger', () => {
    function createPlugin(options = {}): Plugin {
        return functionLogger(options)
    }

    function transform(plugin: Plugin, code: string, id = 'test.ts') {
        if (!plugin.transform) return null
        const transformFn = (typeof plugin.transform === 'function'
            ? plugin.transform
            : plugin.transform.handler)
        return transformFn.call(plugin, code, id) as TransformResult | null
    }

    it('should inject logger into normal function', () => {
        const plugin = createPlugin()
        const code = `
      function test() {
        return 1 + 1
      }
    `
        const result = transform(plugin, code)
        expect(result).not.toBeNull()
        expect(result?.code).toMatchInlineSnapshot(`
          "function test() {
            console.log("Entering function: test");
            return 1 + 1;
          }"
        `)
    })

    it('should inject logger into arrow function', () => {
        const plugin = createPlugin()
        const code = `
      const test = () => {
        return 1 + 1
      }
    `
        const result = transform(plugin, code)
        expect(result).not.toBeNull()
        expect(result!.code).toMatchInlineSnapshot(`
          "const test = () => {
            console.log("Entering function: test");
            return 1 + 1;
          };"
        `)
    })

    it('should respect pattern option with string', () => {
        const plugin = createPlugin({ pattern: 'test' })
        const code = `
      function test() {
        return 1 + 1
      }
      function other() {
        return 2 + 2
      }
    `
        const result = transform(plugin, code)
        expect(result).not.toBeNull()
        expect(result!.code).toMatchInlineSnapshot(`
          "function test() {
            console.log("Entering function: test");
            return 1 + 1;
          }
          function other() {
            return 2 + 2;
          }"
        `)
    })

    it('should respect pattern option with regex', () => {
        const plugin = createPlugin({ pattern: /^test/ })
        const code = `
      function test1() {
        return 1 + 1
      }
      function test2() {
        return 2 + 2
      }
      function other() {
        return 3 + 3
      }
    `
        const result = transform(plugin, code)
        expect(result).not.toBeNull()
        expect(result!.code).toMatchInlineSnapshot(`
          "function test1() {
            console.log("Entering function: test1");
            return 1 + 1;
          }
          function test2() {
            console.log("Entering function: test2");
            return 2 + 2;
          }
          function other() {
            return 3 + 3;
          }"
        `)
    })

    it('should respect enabled option', () => {
        const plugin = createPlugin({ enabled: false })
        const code = `
      function test() {
        return 1 + 1
      }
    `
        const result = transform(plugin, code)
        expect(result).toBeNull()
    })

    it('should only process js/ts files', () => {
        const plugin = createPlugin()
        const code = `
      function test() {
        return 1 + 1
      }
    `
        const result = transform(plugin, code, 'test.css')
        expect(result).toBeNull()
    })

    it('should handle arrow function without block', () => {
        const plugin = createPlugin()
        const code = `const test = () => 1 + 1`
        const result = transform(plugin, code)
        expect(result).not.toBeNull()
        expect(result!.code).toMatchInlineSnapshot(`
          "const test = () => {
            console.log("Entering function: test");
            return 1 + 1;
          };"
        `)
    })
})
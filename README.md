# remark-code-tabs

A [remark](https://www.npmjs.com/package/remark) plugin to render code tabs in MDX.


## Example 

```js
import { serialize } from "next-mdx-remote/serialize";
import remarkTabs from "remark-tabs";
const parser = async (source) => {
  return serialize(
    source,
    {
      scope: {},
      mdxOptions: {
        remarkPlugins: [remarkTabs],
        format: "mdx",
      },
      parseFrontmatter: true,
    }
  );
};

export default parser;

``` 

You also have to define your components in your parser. For example, with `MDXRemote`: 

```js
import { MDXRemote } from "next-mdx-remote";
import Tabs, { Tabs } from "remark-tabs/Tabs";

const components = {
  Tabs: Tabs,
  Tab: Tab,
  }
  
  export default function App({content}) {
  return (
      <MDXRemote {...content} components={components} />
  );
}
``` 

> Note: you can use your own `Tabs` and `Tab` components, juste make sure they follow the same structure.

Turns a `.mdx` file with content : 

<img width="576" alt="image" src="https://user-images.githubusercontent.com/64375473/177173805-7a2fb171-f754-4a4d-af8a-d6e42b2c2f06.png">

> Note: The `-end` is very important, as it defines the last tab item.

into : 

<img width="837" alt="image" src="https://user-images.githubusercontent.com/64375473/177173864-0c6b0501-b4d3-4f0f-8136-b01d4695fd3c.png">


import { Node } from "@tiptap/core";

export interface IframeOptions {
  allowFullscreen: boolean;
  HTMLAttributes: {
    [key: string]: any;
  };
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    iframe: {
      /**
       * Add an iframe
       */
      setIframe: (options: { id: string; title: string }) => ReturnType;
    };
  }
}

const Video2 = Node.create<IframeOptions>({
  name: "asd",

  group: "block",

  // atom: true,

  // addOptions() {
  //   return {
  //       allowFullscreen: true,
  //       HTMLAttributes: {
  //         class: "iframe-wrapper",
  //       },
  //   };
  // },

  addAttributes() {
    return {
      title: {
        default: "Click to expand",
      },
      id: {
        default: null,
      },
    };
  },

  parseHTML() {
    console.log("parge");

    return [
      {
        tag: "details",
        getAttrs: (node) => {
          const summary = node.querySelector("summary");
          const iframe = node.querySelector("iframe");
          return {
            title: summary ? summary.textContent : "Click to expand",
            id: iframe ? iframe.src.match(/embed\/(.*?)\?/)?.[1] : null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    // HTMLAttributes as attrs of insertContent()

    const { title, id } = HTMLAttributes;
    if (!id) return [""];

    return [
      "details",
      {},
      ["summary", {}, title],
      [
        "iframe",
        {
          src: `https://www.youtube.com/embed/${id}?&rel=0&iv_load_policy=3`,
          frameborder: "0",
          allowfullscreen: "allowfullscreen",
          loading: "lazy",
        },
      ],
    ];
  },

  addCommands() {
    return {
      setIframe:
        ({ id, title }) =>
        ({ commands }) => {
          // call renderHTML above
          return commands.insertContent([
            {
              type: this.name,
              attrs: { id, title },
            },
            {
              type: "paragraph",
            },
          ]);
        },
    };
  },
});

export default Video2;

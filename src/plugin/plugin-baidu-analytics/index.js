module.exports = function (context, options) {
  return {
    name: "docusaurus-plugin-baidu-analytics",
    injectHtmlTags() {
      if (process.env.NODE_ENV === "development") {
        return {};
      }

      return {
        headTags: [
          // shawkry.top
          {
            tagName: "script",
            innerHTML: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?1ca66a04d70a292ea61d04e533a3025a";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
          `,
          },
          // shawkry.top/blog
          {
            tagName: "script",
            innerHTML: `
              var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?c4a10a21b728df83c0d5c18b415e504b";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `,
          },
          {
            tagName: "meta",
            attributes: {
              name: "baidu-site-verification",
              content: "code-rqLUw5reVS",
            },
          },
        ],
      };
    },
  };
};

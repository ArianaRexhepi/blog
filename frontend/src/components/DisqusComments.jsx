import React from "react";
import { DiscussionEmbed } from 'disqus-react';

function DisqusComments({ identifier }) {
  const disqusShortname = "tea-with-ari";
  const disqusConfig = {
    url: `http://example.com/${identifier}`,
    identifier: identifier,
    title: "Tea With Ari",
  };

  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={{
          url: disqusConfig.url,
          identifier: disqusConfig.identifier,
          title: disqusConfig.title,
        }}
      />
    </div>
  );
}

export default DisqusComments;

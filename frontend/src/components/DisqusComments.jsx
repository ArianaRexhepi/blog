import React from "react";
import { useSelector } from "react-redux";
import { DiscussionEmbed } from "disqus-react";

function DisqusComments({ identifier }) {
  const disqusShortname = "tea-with-ari";
  const disqusConfig = {
    url: `http://example.com/${identifier}`,
    identifier: identifier,
    title: "Tea With Ari",
  };

  const user = useSelector((state) => state.user);

  const isLoggedIn = user && user.token;

  return (
    <div>
      {isLoggedIn && (
        <DiscussionEmbed
          shortname={disqusShortname}
          config={{
            url: disqusConfig.url,
            identifier: disqusConfig.identifier,
            title: disqusConfig.title,
          }}
        />
      )}
      {!isLoggedIn && <p>Login to comment.</p>}
    </div>
  );
}

export default DisqusComments;

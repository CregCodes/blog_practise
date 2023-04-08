import React from "react";

const MiroEmbed = () => {
  const miroBoardUrl =
    "https://miro.com/app/board/uXjVP1yHbUU=/?share_link_id=201873246191";

  return (
    <iframe
      src={miroBoardUrl}
      width="100%"
      height="600px"
      frameBorder="0"
      scrolling="yes"
      allowFullScreen
    />
  );
};

export default MiroEmbed;

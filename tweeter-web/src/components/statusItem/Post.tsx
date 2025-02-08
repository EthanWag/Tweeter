import {Status, User, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import useUserNavigation from "../hooks/useUserNavigation";

interface Props {
  status: Status;
  fetchUser:(alias:string) =>Promise <User | null>
}

const Post = (props: Props) => {
  const {navigateToUser} = useUserNavigation(props.fetchUser);

  return (
    <>
      {props.status.segments.map((segment, index) =>
        segment.type === Type.alias ? (
          <Link
            key={index}
            to={segment.text}
            onClick={(event) => navigateToUser(event)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={index}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={index} />
        ) : (
          segment.text
        )
      )}
    </>
  );
};

export default Post;

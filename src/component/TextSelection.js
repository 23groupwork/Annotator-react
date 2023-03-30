import React, { useState, useRef } from "react";
import CurrentUser from "../data/data.js";
import Avatar from "@mui/material/Avatar";
import "../layouts/textselection.css";

function TextSelection({id}) {
  const [selectedText, setSelectedText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const containerRef = useRef();

  function toggleComments(){
    setShowCommentBox(!showCommentBox);
  }

  function handleMouseUp(e) {
    const selected = window.getSelection().toString();
    setSelectedText(selected);

    if (selected) {
      setShowCommentBox(true);
    } else {
      if (document.activeElement.tagName !== "TEXTAREA" &&
      !containerRef.current.contains(e.target)) {
        setShowCommentBox(false);
      }
    }
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    const comment = { 
      id: CurrentUser[id].id,
      text: newComment, 
      replies: [], 
      username: CurrentUser[id].userName, 
      avatar: CurrentUser[id].avatar,
    };
    console.log(comment);
    setComments([...comments, comment]);
    setNewComment("");
  }

  function handleReplySubmit(e) {
    e.preventDefault();
    const updatedComments = comments.map((comment) => {
      if (comment.id === replyTo) {
        return { ...comment, replies: [...comment.replies, replyText] };
      } else {
        return comment;
      }
    });
    setComments(updatedComments);
    setReplyText("");
    setReplyTo(null);
  }

  function handleReplyClick(commentId) {
    setReplyTo(commentId);
  }

  return (
    <div ref={containerRef} className="text-container" onMouseUp={handleMouseUp} style={{display: "flex", alignItems: "flex-start"}}>
      {/* 在这里插入要处理的文本内容 */}
      <p>
        Your text goes here. Users can select and translate the text on this
        page.
      </p>
      {showCommentBox && (
        <div className="comment-box" style={{display: "flex", flexDirection:"column"}}>
          <button onClick={toggleComments}>
            {showCommentBox ? "Hide Comments" : "Show Comments"}
          </button>
          <h4>Comments:</h4>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <Avatar>{comment.avatar}</Avatar>
                {comment.username}: {comment.text}
                <button onClick={() => handleReplyClick(comment.id)}>
                  Reply
                </button>
                <ul>
                  {comment.replies.map((reply, index) => (
                    <li key={index}>{reply}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          {replyTo && (
            <form onSubmit={handleReplySubmit}>
              <textarea
                rows="2"
                cols="30"
                placeholder="Enter your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <button type="submit" onMouseDown={handleReplySubmit}>
                Submit Reply
              </button>
            </form>
          )}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              rows="4"
              cols="30"
              placeholder="Enter your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button type="submit" onMouseDown={handleCommentSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TextSelection;
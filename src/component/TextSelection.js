import React, { useState, useRef } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import "../layouts/textselection.css";
import CommentData from "../data/commentData";

function Toolbar({onCommentClick, onCommentHighlight, toolbarRef}){
  return(
    <div className="toolbar" style={{ display: "flex", flexDirection: "row"}}>
          <div ref={toolbarRef}>
          <button onClick={onCommentClick}>Comment</button>
          |
          <button onClick={onCommentHighlight}>Highlight</button>
          </div>
        </div>
  );
}

function Commentbox({boxKey, currentUser, title, newComment, setNewComment,toggleComments, showCommentBox}){
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  // console.log(Object.values(CommentData[boxKey-1])[0])
  async function handleCommentSubmit(e) {
    e.preventDefault();
    if(currentUser.id==="guest"){
      alert("Register, plz")
      return;
    }
    const uniqueId = Date.now();
    const comment = { 
      id: uniqueId,
      text: newComment, 
      replies: [], 
      username: currentUser.userName, 
      avatar: Object.values(currentUser.avatar),
    };

    // console.log(comment);
    // setComments([...comments, comment]);
    // setNewComment("");
    const updatedComments = { ...comments, [boxKey]: [...(comments[boxKey] || []), comment] };
    setComments(updatedComments);
    setNewComment("");
    // try{
    //   const response = await axios.post("http://localhost:8088/submitComment", comment);
    //   const savedComment = response.data;
    //   setComments([...comments, savedComment]);
    //   setNewComment("");
    // } catch(error){
    //   console.error("Error submitting comment:", error);
    // }
  }

  function handleReplyClick(commentId) {
    setReplyTo(commentId);
  }

  async function handleReplySubmit(e) {
    e.preventDefault();
    // const updatedComments = comments.map((comment) => {
      // if (comment.id === replyTo) {
      //   return { ...comment, replies: [...comment.replies, replyText] };
      // } else {
      //   return comment;
      // }
      // return { ...comment, replies: [...comment.replies, replyText] };
    // });
    const updatedComments = {
      ...comments,
      [boxKey]: comments[boxKey].map((comment) => {
        if (comment.id === replyTo) {
          return { ...comment, replies: [...comment.replies, replyText] };
        } else {
          return comment;
        }
      }),
    };
    setComments(updatedComments);
    setReplyText("");
    setReplyTo(null);
    // try{
    //   const response = await axios.post("http://localhost:8088/submitComment", updatedComments);
    //   const savedComment = response.data;
    //   setComments(savedComment);
    //   setReplyText("");
    //   setReplyTo(null);
    // } catch(error){
    //   console.error("Error submitting reply comment:", error);
    // }
  }

  return(
    <div className="comment-box" style={{display: "flex", flexDirection:"column"}}>
          <button onClick={toggleComments}>
            {showCommentBox ? "Hide Comments" : "Show Comments"}
          </button>
          <h4>{title} part{boxKey} Comments:</h4>
          <ul>
            {/* 已有评论 */}
            {CommentData[boxKey-1] && Object.values(CommentData[boxKey-1])[0].map((commentdata) => (
              <li key={commentdata.id}>
                <Avatar>{commentdata.avatar}</Avatar>
                {commentdata.username}: {commentdata.text}
                <button onClick={() => handleReplyClick(commentdata.id)}>
                  Reply
                </button>
                <ul>
                  {commentdata.replies.map((reply, index) => (
                    <li key={index}>{reply}</li>
                  ))}
                </ul>
              </li>
            ))}
            {comments[boxKey] &&
          comments[boxKey].map((comment) => (
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
  );
}

function TextSelection({currentUser, title, content, summary}) {
  const [showToolBar, setShowToolBar] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);
  const containerRef = useRef();
  const toolbarRef = useRef(null);

  function handleMouseUp(e) {
    const selected = window.getSelection();
    const selectedString = selected.toString();
    setSelectedText(selectedString);
  
    if (selectedString) {
      // 获取选中文本的范围和起始节点
      const range = selected.getRangeAt(0);
      const startNode = range.startContainer.parentElement;
  
      // 遍历所有段落，找到包含选中文本的段落
      let foundKey = null;
      Object.entries(content).forEach(([key, value]) => {
        if (startNode.textContent.includes(value)) {
          foundKey = key;
        }
      });
  
      setSelectedKey(foundKey);
      setShowToolBar(true);
    } else {
      if (
        document.activeElement.tagName !== "TEXTAREA" &&
        !containerRef.current.contains(e.target) &&
        !toolbarRef.current.contains(e.target)
      ) {
        setShowCommentBox(false);
      }
    }
  }

  function toggleComments(){
    setShowCommentBox(!showCommentBox);
  }

  const onCommentClick = () => {
    setShowToolBar(false);
    setShowCommentBox(true);
  };

  const onCommentHighlight = () => {
    const selectedText = window.getSelection();
    if (selectedText.toString().length > 0) {
      const span = document.createElement('span');
      span.className = 'highlight';
      selectedText.getRangeAt(0).surroundContents(span);
    }
  };

  return (
    Object.entries(content).map(([key, value])=>(
      <li key={key} style={{listStyle: "none", justifyItems: "center"}}>
      <div ref={containerRef} className="text-container" onMouseUp={handleMouseUp} style={{display: "flex", alignItems: "flex-start", margin: "2em"}}>
      {/* 在这里插入要处理的文本内容 */}
      <div style={{display: "flex", flexDirection: "column"}}>
        {summary}
        {key}
        <p>
        {value}
        </p>
      </div>
      {/* 工具栏 */}
      {showToolBar && key === selectedKey &&(
      <Toolbar onCommentClick={onCommentClick} onCommentHighlight={onCommentHighlight} toolbarRef={toolbarRef}/>
      )}
      {/* 展示或关闭评论 */}
      {showCommentBox && (
        <Commentbox boxKey={selectedKey} currentUser={currentUser} title={title} newComment={newComment} setNewComment={setNewComment} toggleComments={toggleComments} showCommentBox={showCommentBox}/>
      )}
    </div>
    </li>
    ))
  );
}

export default TextSelection;
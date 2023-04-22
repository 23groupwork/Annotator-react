import React, { useState, useRef } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button';
import "../layouts/textselection.css";
import { useEffect } from "react";

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
  const [replyText, setReplyText] = useState([]);
  const [newReplyText, setNewReplyText] =useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [shownReplies, setShownReplies] = useState({});
  // setComments(commentData);
  // console.log(Object.values(CommentData[boxKey-1])[0])
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.post(`http://35.178.198.96:3000/api/users/getComment?content_id=${boxKey}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  
    fetchComments();
  }, [boxKey]);

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if(currentUser.userName==="guest"){
      alert("Register, plz")
      return;
    }
    
    const comment = { 
      comment_detail: newComment,
      comment_user_name: currentUser.userName,
      content_id: boxKey,
    };

    console.log(comment)
    try{
      const response = await axios.post("http://35.178.198.96:3000/api/users/writeComment", comment);
      if(response.data.message==="Data has been successfully written"){
        const getCommentResponse = await axios.post(`http://35.178.198.96:3000/api/users/getComment?content_id=${boxKey}`);
        console.log(getCommentResponse.data.comments)
        setComments(getCommentResponse.data.comments);
        setNewComment("");
      }
    } catch(error) {
      console.error("Error submitting comment:", error);
    }
  }

  function handleReplyClick(commentId) {
    // setReplyTo(commentId);
    setReplyTo(replyTo === commentId ? null : commentId);
  }

  async function handleGetReply(commentId){
    try{
      const response = await axios.post(`http://35.178.198.96:3000/api/users/getReply?comment_id=${commentId}`);
      console.log(response.data)
      setReplyText(response.data.replies);
      // setShowReply(!showReply);
      setShownReplies((prevShownReplies) => ({
        ...prevShownReplies,
        [commentId]: !prevShownReplies[commentId],
      }));
    } catch(error) {
      console.error(error.response.data)
      alert(error.response.data.error)
    }
  }

  async function handleReplySubmit(e, comment_id) {
    e.preventDefault();
    if(currentUser.userName==="guest"){
      alert("Register, plz")
      return;
    }
    try{
      console.log(comment_id)
      const reply_detail = newReplyText
      const userName = currentUser.userName
      const newReply = {
        comment_id,
        reply_detail,
        userName,
      };
      console.log(newReply)
      const response = await axios.post(`http://35.178.198.96:3000/api/users/writeReply?comment_id=${comment_id}&reply_detail=${reply_detail}&reply_user_name=${userName}`);
      console.log(response)
      const responseComment = await axios.post(`http://35.178.198.96:3000/api/users/getReply?comment_id=${comment_id}`);
      setReplyText(responseComment.data.replies);
      setShownReplies((prevShownReplies) => ({
        ...prevShownReplies,
        [comment_id]: !prevShownReplies[comment_id],
      }));
      setReplyTo(null);
    } catch(error){
      console.error("Error submitting reply comment:", error);
    }
  }

  return(
    <div className="comment-box" style={{display: "flex", flexDirection:"column"}}>
          <Button style={{textTransform: 'none'}} variant="contained" onClick={toggleComments}>
            {showCommentBox ? "Hide Comments" : "Show Comments"}
          </Button>
          <h4>{title} Comment room id:{boxKey}</h4>
          <h4>Comments:</h4>
            {comments &&
            comments.map((comment) => (
            <ul key={comment.comment_id}>
              <Avatar>{comment.avatar}</Avatar>
                {comment.comment_user_name}: {comment.comment_detail}
                <Button style={{textTransform: 'none'}} variant="contained" onClick={() => handleReplyClick(comment.comment_id)}>
                  Reply
                </Button>
                {!shownReplies[comment.comment_id] && <button onClick={() => handleGetReply(comment.comment_id)}>More replies...</button>}
                {shownReplies[comment.comment_id] && <button onClick={() => handleGetReply(comment.comment_id)}>Fold replies...</button>}
                {shownReplies[comment.comment_id] && replyText.map((reply) => (
                  <li key={reply.reply_id}>
                  <Avatar>{reply.reply_user_name.charAt(0)}</Avatar>
                    {reply.reply_user_name}: {reply.reply_detail}
                  </li>
                ))}
                {replyTo === comment.comment_id && (
                      <form onSubmit={(e) => handleReplySubmit(e, comment.comment_id)}>
                      <textarea
                    rows="3"
                    cols="30"
                    placeholder="Enter your reply..."
                    value={newReplyText}
                    onChange={(e) => setNewReplyText(e.target.value)}></textarea>
                      <Button style={{textTransform: 'none'}} variant="contained" type="submit">
                        Submit Reply
                      </Button>
                      </form>
                )}
            </ul>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              rows="4"
              cols="30"
              placeholder="Enter your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <Button style={{textTransform: 'none'}} variant="contained" type="submit">
              Submit
            </Button>
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
        {/* {key} */}
        <p>
        {value}
        </p>
      </div>
      {/* 工具栏 */}
      {showToolBar && key === selectedKey &&(
      <Toolbar onCommentClick={() => onCommentClick(key)} onCommentHighlight={onCommentHighlight} toolbarRef={toolbarRef}/>
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
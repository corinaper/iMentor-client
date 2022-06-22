import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import questions from '../../services/question.services';
import { useState } from 'react';
import '../../components/QuestionCard/QuestionCard.css';
import Skills from '../../components/Skills/Skills';

const skillList = [];

const Question = () => {
	const [ questionList, setQuestionList ] = useState([]);
	const [ filteredList, setfilteredList ] = useState([]);

	useEffect(() => {
		questions
			.getAllQuestions()
			.then((questions) => {
				const reversedQuestions = questions.data.reverse();
				setQuestionList(reversedQuestions);
				setfilteredList(reversedQuestions);
			})
			.catch((err) => console.log(err));
	}, []);

	function filterQuestions(e) {
		if (!skillList.includes(e.target.id)) skillList.push(e.target.id);
		else {
			skillList.splice(skillList.indexOf(e.target.id), 1);
		}

		const newList = questionList.filter((mentor) => skillList.some((skill) => mentor.skills.includes(skill)));
		if (newList.length > 0) setfilteredList(newList);
		else setfilteredList(questionList);
	}

	return (
		<div>
			<div className="width">
				<Skills function={filterQuestions} filtering={skillList} />
				<Link to={`/addquestion`}>
					<button className="addPostBtn">Add a post</button>
				</Link>
				{filteredList.map(({ _id, owner, title, description, comments }) => {
					const shortDescription = description.slice(0, 100) + '...';
					return (
						<div key={_id}>
							<div className="questionCard">
								<div className="flex">
									<Link to={`/profile/${owner._id}`} className="nomargin">
										<img className="profileImg" src={owner.profileImg} alt="" />
									</Link>
									<h3 className="nomargin">{owner.username}</h3>
								</div>
								<div className="linkToQuestionDetails">
									<p>{title}</p>
									<p>{shortDescription}</p>
								</div>
								<div className="flex space-between">
									<div className="flex comments">
										<img
											src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655752346/iMentor/comment_1_wafgsd.png"
											alt=""
										/>
										<div>{comments.length}</div>
									</div>
									<Link to={`/questions/${_id}`} className="whiteButton buttonSizeS">
										Read more
									</Link>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Question;

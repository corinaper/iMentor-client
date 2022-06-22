import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import mentors from '../../services/mentor.service';
import { useState } from 'react';
import './MentorCard.css';
import Skills from '../Skills/Skills';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import '../MentorCard/MentorCard.css';

const skillList = [];

const Mentors = () => {
	const [ mentorsList, setMentorsList ] = useState([]);
	const [ filteredList, setfilteredList ] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		mentors
			.getAllMentors()
			.then((mentors) => {
				setMentorsList(mentors.data);
				setfilteredList(mentors.data);
			})
			.catch((err) => console.log(err));
	}, []);

	function filterMentors(e) {
		if (!skillList.includes(e.target.id)) skillList.push(e.target.id);
		else {
			skillList.splice(skillList.indexOf(e.target.id), 1);
		}

		const newList = mentorsList.filter((mentor) => skillList.some((skill) => mentor.skills.includes(skill)));
		if (newList.length > 0) setfilteredList(newList);
		else setfilteredList(mentorsList);
	}

	return (
		<div>
			<div className="mentorCardContainer width">
				<Skills function={filterMentors} filtering={skillList} />
				{filteredList.map(({ _id, profileImg, username, aboutMe, course }) => {
					const shortAboutMe = aboutMe.slice(0, 100) + '...';
					return (
						<div key={_id} className="mentorCard">
							<img className="mentorImage" src={profileImg} alt={username} />

							<div className="profile-main">
								<p>Course: {course}</p>
								<h2 className="mentor-name">{username}</h2>
								<p className="mentor-body">{shortAboutMe}</p>
							</div>
							<div className="mentorBtns">
								<Link className="whiteButton" to={`/profile/${_id}`}>
									Profile
								</Link>
								<Link className="blueButton" to={`/chats/${user._id}/${_id}`}>
									Contact
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Mentors;

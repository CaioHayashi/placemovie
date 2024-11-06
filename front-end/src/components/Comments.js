import React, { useState } from "react";
// import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";

export const Comments = (movieId) => {
	// const { user } = useAuth();
	const [comments, setComments] = useState([
		{
			id: 1,
			content:
				"Lorem ipsum odor amet, consectetuer adipiscing elit. Augue himenaeos ullamcorper justo sociosqu elit; feugiat feugiat elementum. Velit nisl ultricies; per metus dis augue sapien vulputate. Nam ridiculus imperdiet nisi efficitur ante sodales. Ullamcorper risus lorem massa himenaeos iaculis aliquam nec congue lectus. Vulputate est velit sodales, nibh fringilla himenaeos tempus tempor. Rhoncus risus viverra netus elementum facilisi posuere porttitor quam conubia. Aenean per ultrices vivamus dis fames nullam per. Vitae consectetur semper eleifend mauris primis adipiscing eget lectus interdum. Elit nostra interdum dapibus fermentum tristique aliquam ut.",
			username: "Moises"
		},
		{
			id: 2,
			content:
				"Lorem ipsum odor amet, consectetuer adipiscing elit. Montes pharetra consectetur habitasse, augue penatibus sagittis enim mauris. Nullam magna leo nisi aptent luctus. Accumsan dis fames pulvinar libero enim. Litora quis ultricies netus luctus cubilia. Metus dapibus et dapibus; sit varius suspendisse. Nascetur phasellus parturient elementum est urna morbi. Egestas in vulputate eros felis curabitur. Euismod nullam fermentum nunc ullamcorper nostra nam ad urna.",
			username: "Brayan"
		},
		{
			id: 3,
			content:
				"Lorem ipsum odor amet, consectetuer adipiscing elit. Lacinia magna mi tincidunt metus magnis convallis faucibus nascetur. Ornare sed nullam hendrerit scelerisque velit laoreet. Dolor venenatis turpis augue libero tempor vivamus. Congue adipiscing platea pretium habitant eleifend auctor sem rhoncus. Erat ad neque fringilla ac enim accumsan lorem torquent. Nostra fames sociosqu rhoncus morbi scelerisque.",
			username: "Leo"
		},
		{
			id: 4,
			content:
				"Lorem ipsum odor amet, consectetuer adipiscing elit. Senectus ligula mus, eu dui mollis augue elementum.",
			username: "Igor"
		},
		{
			id: 5,
			content:
				"Lorem ipsum odor amet, consectetuer adipiscing elit. Torquent neque curae nunc, at sem vitae.",
			username: "Renan"
		}
	]);
	console.log(setComments);
	return (
		<Container>
			<h1>Comentários</h1>

			<Content>
				<TextArea placeholder="Comente sobre o filme!"></TextArea>
				<ScrollableContainer>
					{comments?.map((comment) => (
						<Comment key={comment.id}>
							<Username>@{comment.username}</Username>
							<p style={{ padding: "12px" }}>{comment.content}</p>
						</Comment>
					))}
				</ScrollableContainer>
			</Content>
		</Container>
	);
};

const Container = styled.div`
	margin: auto;
	padding: 5%;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`;

const TextArea = styled.textarea`
	min-width: 500px;
	height: 200px;
	background-color: #ffffff15;
	border-radius: 14px;
	padding: 12px;
	border: 2px solid #ccc;
	color: white;
`;



const Comment = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 500px;
	min-height: 100px;
	background-color: #ffffff15;
	/* border-radius: 14px; */
	margin-top: 4px;
	color: white;
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 20px;
`;

const Username = styled.div`
	padding: 4px 12px;
	font-size: 12px;
	background-color: var(--quaternary);
	font-weight: bold;
	color: var(--quarternary);
`;

const ScrollableContainer = styled.div`
	/* Define a altura máxima do container */
	overflow-y: auto; /* Habilita a rolagem vertical */
	height: 500px;
`;

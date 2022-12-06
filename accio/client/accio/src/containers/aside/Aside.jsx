import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DndProvider } from "react-dnd";
import { Tree, MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import useSingleAndDoubleClick from "hooks/useSingleAndDoubleClick";
import { ref } from "yup";

const AsideContainer = styled.aside`
	height: calc(100% - 50px - 2em);
	width: 360px;
	background-color: transparent;
	position: absolute;
	z-index: 0;
	top: 50px;
	left: 0;
	padding: 1em;
	box-shadow: 0px 0px 2em 1em #00000020;
	overflow: hidden;
`;

const FolderBrowser = styled.div`
	position: relative;
	background-color: #ffffff;
	overflow: auto;
	height: calc(100% - 150px - 2em);
`;

const Menu = styled.div`
	position: relative;
	margin-top: 2em;
	padding-top: 1em;
	min-height: 100px;
	max-height: 150px;
	border-top: 1px solid #00000020;
	overflow: auto;
`;

const NavItem = styled.a`
	display: flex;
	flex-direction: row;
	text-align: left;
	align-items: center;
	padding: 0.3em 1em;
	width: 100%;
	text-decoration: none;
	color: #000000;
`;
const NavItemIcon = styled.span`
	padding: 0 0.5em;
`;

const SampleData = [
	{
		id: 1,
		parent: 0,
		droppable: true,
		draggable: true,
		text: "Root",
		data: {
			icon: {
				expanded: "🌏️",
				collapsed: "🌎️",
			},
		},
		sortOrder: 0,
	},
	{
		id: 2,
		parent: 0,
		droppable: false,
		text: "FirstFolder",
		sortOrder: 2,
	},
	{
		id: 3,
		parent: 0,
		droppable: false,
		text: "Nope",
		sortOrder: 1,
	},
	{
		id: 4,
		parent: 0,
		droppable: true,
		text: "Folder 2",
	},
	{
		id: 5,
		parent: 4,
		droppable: true,
		text: "Folder 2-1",
	},
	{
		id: 6,
		parent: 5,
		droppable: false,
		text: "File 2-1-1",
	},
	{
		id: 7,
		parent: 0,
		droppable: false,
		text: "File 3",
	},
	{
		id: 8,
		parent: 0,
		droppable: true,
		text: "Folder 1",
	},
	{
		id: 9,
		parent: 1,
		droppable: false,
		text: "File 1-1",
	},
	{
		id: 13,
		parent: 3,
		droppable: false,
		text: "File 1-2",
	},
	{
		id: 14,
		parent: 4,
		text: "Folder 89",
	},
	{
		id: 15,
		parent: 5,
		droppable: true,
		text: "Folder 2-1",
	},
	{
		id: 16,
		parent: 6,
		droppable: false,
		text: "File 2-1-1",
	},
	{
		id: 17,
		parent: 0,
		droppable: false,
		text: "File 3",
	},
];

const RootFolderContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	text-align: left;
	margin: 0;
	padding: 0.3em;
	text-indent: 0.3em;
	padding-inline-start: ${(props) => props.depth * 30 + "px"};
	background-color: ${(props) => (props.isRootFolder ? "#00000010" : "#0000000")};
	border-bottom: ${(props) => (props.hasChild || props.isRootFolder ? "1px solid #00000020" : "none")};
	cursor: pointer;
	&::after {
		content: "";
		position: absolute;
		bottom: -1px;
		left: 0;
		width: ${(props) => props.depth * 30 + "px"};
		height: 1px;
		background-color: ${(props) => (props.isRootFolder ? "#00000010" : "#ffffff")};
	}
`;

function RootFolder(node, options) {
	const { depth, isOpen, onToggle, hasChild } = options;

	const clickHandler = useSingleAndDoubleClick(onToggle, () => {
		console.log("2");
	});

	let icon = "🗄️";
	if (isOpen) {
		if (node.data && "icon" in node.data) {
			icon = node.data.icon.expanded;
		} else {
			icon = "📂";
		}
	} else {
		if (node.data && "icon" in node.data) {
			icon = node.data.icon.collapsed;
		} else {
			icon = "📁";
		}
	}
	icon += " "; // empty space for visual correctness

	return (
		<RootFolderContainer onClick={clickHandler} depth={depth} isRootFolder={node.parent == 0} hasChild={hasChild}>
			<div style={{ width: "100%" }}>
				{hasChild ? <span>{icon}</span> : "🗃️ "}
				<span style={{ zIndex: 100 }}>{node.text}</span>
			</div>
		</RootFolderContainer>
	);
}

function Aside() {
	const treeRef = useRef(null);
	const [treeData, setTreeData] = useState(SampleData);
	const handleDrop = (newTree) => setTreeData(newTree);
	const handleSort = (node1Data, node2Data) => {
		const node1Order = node1Data.sortOrder ?? Infinity;
		const node2Order = node2Data.sortOrder ?? Infinity;
		return node1Order < node2Order ? -1 : 1;
	};

	return (
		<AsideContainer>
			<FolderBrowser>
				<DndProvider backend={MultiBackend} options={getBackendOptions()}>
					{/* prettier-ignore */}
					<Tree
						ref={treeRef}
						tree={treeData}
						rootId={0}
						render={RootFolder}
						sort={handleSort}
						dragPreviewRender={(monitorProps) => <div>{monitorProps.item.text}</div>}
						onDrop={handleDrop}
					/>
				</DndProvider>
			</FolderBrowser>

			<Menu>
				<NavItem href="#">
					<NavItemIcon className="icon">➕</NavItemIcon>
					<span>Create a new section</span>
				</NavItem>
				<NavItem href="#">
					<NavItemIcon>🗑️</NavItemIcon>
					<span>Trash</span>
				</NavItem>
				<NavItem href="#">
					<NavItemIcon>🚩</NavItemIcon>
					<span>Dashboard</span>
				</NavItem>
				<NavItem href="#">
					<NavItemIcon>👤</NavItemIcon>
					<span>Manage Users</span>
				</NavItem>
			</Menu>
		</AsideContainer>
	);
}

export default Aside;


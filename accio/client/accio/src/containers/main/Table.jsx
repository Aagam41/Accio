import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { DOCUMENT_STORAGE_API_BASE_URL } from "config";
import styled from "styled-components";
import { AuthContext, useAuth } from "services/authentication";

const Table = styled.table`
	overflow: scroll;
`;

function DocumentTable() {
	const [data, setData] = useState([]);
	axios
		.get(`${DOCUMENT_STORAGE_API_BASE_URL}/document/`)
		.then((res) => {
			setData(res.data);
		})
		.then(() => {});

	const columns = React.useMemo(
		() => [
			// { Header: "ID", accessor: "id" },
			// { Header: "Document", accessor: "document" },
			{ Header: "Name", accessor: "name" },
			{ Header: "Last Modified", accessor: "last_modified" },
			{ Header: "Size", accessor: "size" },
			{ Header: "Type", accessor: "mime_type" },
			{ Header: "Path", accessor: "path" },
			{ Header: "User", accessor: "user" },
			{ Header: "Upload Date", accessor: "upload_datetime" },
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<Table {...getTableProps()} style={{ border: "solid 1px blue" }}>
			<thead>
				{headerGroups.map((headerGroup, headerGroupIndex) => (
					<tr key={headerGroupIndex} {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, columnIndex) => (
							<th
								key={columnIndex}
								{...column.getHeaderProps()}
								style={{
									borderBottom: "solid 3px red",
									background: "aliceblue",
									color: "black",
									fontWeight: "bold",
								}}
							>
								{column.render("Header")}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, rowIndex) => {
					prepareRow(row);
					return (
						<tr key={rowIndex} {...row.getRowProps()}>
							{row.cells.map((cell, cellIndex) => {
								return (
									<td
										key={cellIndex}
										{...cell.getCellProps()}
										style={{
											padding: "10px",
											border: "solid 1px gray",
											background: "papayawhip",
										}}
									>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
}

export default DocumentTable;


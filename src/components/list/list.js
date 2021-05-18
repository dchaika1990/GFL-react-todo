import ListItem from "../list-item";

const List = ({items, clickHandler}) => {
	return (
		<ul>
			{items.map(({id, name}) => (
				<ListItem key={id} id={id} text={name} clickHandler={clickHandler}/>
			))}
		</ul>
	);
};

export default List;
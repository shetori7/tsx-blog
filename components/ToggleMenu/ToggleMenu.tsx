import { useState } from "react";
import style from "./ToggleMenu.module.css";


export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div className={style.menu}>
			<div onClick={toggleMenu}>
				メニュー
			</div>
			{isOpen && (
				<div>
					<ul>
						<li>メニュー1</li>
						<li>メニュー2</li>
						<li>メニュー3</li>
					</ul>
				</div>
			)}
		</div>
	);
}

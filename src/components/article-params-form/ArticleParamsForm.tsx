import { type FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	type ArticleStateType,
	type OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggle = () => {
		setIsOpen((currentIsOpen) => !currentIsOpen);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleFontFamilyChange = (fontFamilyOption: OptionType) => {
		setFormState((currentState) => ({
			...currentState,
			fontFamilyOption,
		}));
	};

	const handleFontSizeChange = (fontSizeOption: OptionType) => {
		setFormState((currentState) => ({
			...currentState,
			fontSizeOption,
		}));
	};

	const handleFontColorChange = (fontColor: OptionType) => {
		setFormState((currentState) => ({
			...currentState,
			fontColor,
		}));
	};

	const handleBackgroundColorChange = (backgroundColor: OptionType) => {
		setFormState((currentState) => ({
			...currentState,
			backgroundColor,
		}));
	};

	const handleContentWidthChange = (contentWidth: OptionType) => {
		setFormState((currentState) => ({
			...currentState,
			contentWidth,
		}));
	};

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const target = event.target;

			if (
				target instanceof Node &&
				panelRef.current &&
				!panelRef.current.contains(target)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('click', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<div ref={panelRef}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

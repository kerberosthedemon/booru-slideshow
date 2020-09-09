import React from 'react';
import ChipWithButtons from 'components/ChipWithButtons/ChipWithButtons';
import ChipButton from 'components/ChipWithButtons/ChipButton/ChipButton';
import useTagsContext from '../../../../../hooks/useTagsContext';

export default function Tag({ tagProps }) {

  const [, tagActions] = useTagsContext();

  function includeTag() {
    tagActions.addTag(getTag());
  };

  function excludeTag() {
    tagActions.addTag(`-${getTag()}`);
  }

  function includeRelativeTag() {
    tagActions.addTag(`~${getTag()}`);
  }

  function getTag() {
    if (tagProps.includeTitleInChip) {
      return `${tagProps.title.toLowerCase()}${tagProps.tag}`
    }
    else {
      return tagProps.tag;
    }
  }

  return (
    <ChipWithButtons
      label={tagProps.tag}
      key={`tag_${tagProps.title}_${tagProps.index}`}
      className={`${tagProps.classes.chip} + ${tagProps.extraClass}`}>
      <ChipButton onClick={includeTag}>+</ChipButton>
      <ChipButton onClick={excludeTag}>-</ChipButton>
      <ChipButton onClick={includeRelativeTag}>~</ChipButton>
    </ChipWithButtons>);
}
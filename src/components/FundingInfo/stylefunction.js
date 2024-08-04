const getColor = (props) => {
  if (props.$percent == 100 && props.$length === props.$idx - 1)
    return props.$color;

  if (props.$nextIdx === props.$idx) return 'var(--gray-500)';

  if (props.$idx === 'join') return 'var(--orange-pri)';

  if (props.$type === 'info' || props.$num !== props.$length)
    return 'var(--gray-300)';

  return props.$color;
};

const getBackgroundColor = (props) => {
  if (props.$num !== props.$length && props.$type === 'add')
    return 'var(--gray-300)';

  if (props.$type === 'add') return 'var(--jade-pri)';

  if (props.id === 'join') return 'var(--orange-pri)';

  if (props.$price <= props.$balance) return props.$color;

  return 'var(--gray-300)';
};

const getOpacity = (props) => {
  if (
    props.$idx == props.$selected ||
    (props.$percent == 100 && props.$length === props.$idx - 1)
  )
    return '1';

  if (props.$joinPrice && props.$idx !== 'join') return '0';

  if (
    props.$idx === props.$nextIdx ||
    props.$idx === 'join' ||
    props.$num === props.$length
  ) {
    return '1';
  }

  return '0';
};

export { getColor, getBackgroundColor, getOpacity };

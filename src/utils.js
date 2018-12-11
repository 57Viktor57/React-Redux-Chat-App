import cn from 'classnames';

export default {
  dropdown: (toggle, id) => cn({
    'btn-group': true,
    'd-none': toggle !== id,
    'mt-3': true,
    'w-100': true,
    'btn-group-sm': true,
  }),
  buttonSplit: style => cn({
    [`btn-${style}primary`]: true,
    btn: true,
    'btn-primary': true,
    'dropdown-toggle': true,
    'dropdown-toggle-split': true,
  }),
  channel: style => cn({
    btn: true,
    'w-100': true,
    [`btn-${style}primary`]: true,
  }),
};

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './SettingsModal.css';

const SETTINGS_FIELDS = [
  {
    id: 'tileSize',
    label: 'Размер квадратного блока',
    description: 'Размер стороны плитки закладки в пикселях.'
  },
  {
    id: 'tileTextSize',
    label: 'Размер шрифта надписей',
    description: 'Размер текста внутри плиток закладок.'
  },
  {
    id: 'titleSize',
    label: 'Размер шрифта заголовка',
    description: 'Размер названий карточек папок.'
  }
];

const toInputState = (settings) => ({
  tileSize: String(settings.tileSize),
  tileTextSize: String(settings.tileTextSize),
  titleSize: String(settings.titleSize)
});

export default function SettingsModal(props) {
  const {
    isOpen,
    onClose,
    onSave,
    settings,
    limits
  } = props;
  const [values, setValues] = useState(toInputState(settings));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setValues(toInputState(settings));
    setErrors({});
  }, [isOpen, settings]);

  const onChangeValue = (fieldName) => (event) => {
    const nextValue = event.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: nextValue
    }));
  };

  const getValidationError = (fieldName, value) => {
    const fieldLimits = limits[fieldName];
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return 'Введите число.';
    }

    if (!Number.isInteger(numericValue)) {
      return 'Допустимы только целые значения.';
    }

    if (numericValue < fieldLimits.min || numericValue > fieldLimits.max) {
      return `Диапазон: ${fieldLimits.min}-${fieldLimits.max}.`;
    }

    return '';
  };

  const submitSettings = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const nextSettings = {};

    SETTINGS_FIELDS.forEach((field) => {
      const errorText = getValidationError(field.id, values[field.id]);
      if (errorText) {
        nextErrors[field.id] = errorText;
        return;
      }

      nextSettings[field.id] = Number(values[field.id]);
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(nextSettings);
  };

  return (
    <Modal
      centered
      show={isOpen}
      onHide={onClose}
      animation
    >
      <Form onSubmit={submitSettings}>
        <Modal.Header closeButton>
          <Modal.Title>Настройки отображения</Modal.Title>
        </Modal.Header>

        <Modal.Body className="settings-modal__body">
          {SETTINGS_FIELDS.map((field) => (
            <Form.Group className="settings-modal__group" key={field.id}>
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type="number"
                value={values[field.id]}
                onChange={onChangeValue(field.id)}
                min={limits[field.id].min}
                max={limits[field.id].max}
                isInvalid={Boolean(errors[field.id])}
              />
              <Form.Text className="settings-modal__hint">
                {field.description} Диапазон: {limits[field.id].min}-{limits[field.id].max}px.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors[field.id]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

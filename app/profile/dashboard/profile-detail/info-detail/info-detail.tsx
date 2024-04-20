import { InfoItem } from './info-item/info-item'

export const InfoDetail = () => {
  const items = [
    { id: 'displayName', label: 'Name' },
    { id: 'email', label: 'Email' }
  ]
  return (
    <div>
      {items.map((item) => (
        <InfoItem key={item.id} id={item.id} label={item.label} />
      ))}
    </div>
  )
}

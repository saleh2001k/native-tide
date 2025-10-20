// // import SearchIcon from '@assets/svg/Search.svg';
// // import MenuIcon from '@assets/svg/Menu.svg';
// // import BasketIcon from '@assets/svg/Basket.svg';
// // import LogoIcon from '@assets/svg/Logo.svg';
// // import AccountIcon from '@assets/svg/Account.svg';
// // import CloseIcon from '@assets/svg/Close.svg';
// // import PlusIcon from '@assets/svg/Plus.svg';
// // import MinusIcon from '@assets/svg/Minus.svg';
// // import CalendarIcon from '@assets/svg/Calendar.svg';
// // import LeftArrowIcon from '@assets/svg/LeftArrow.svg';
// // import RightArrowIcon from '@assets/svg/RightArrow.svg';
// // import ChevronIcon from '@assets/svg/Cheveron.svg';
// // import TruckIcon from '@assets/svg/Delivery.svg';
// // import MapPinIcon from '@assets/svg/Locations.svg';

// import { SvgProps } from 'react-native-svg';

// import AssetInspectionIcon from '@assets/icons/assetInspection.svg';
// import OrderTrackingIcon from '@assets/icons/orderTracking.svg';
// import OffHireIcon from '@assets/icons/offHire.svg';
// import InvoicesIcon from '@assets/icons/invoices.svg';
// import ProfileIcon from '@assets/icons/profile.svg';
// import DepotsIcon from '@assets/icons/depots.svg';

// // If you want to use the icons as a component, you can use the following code:
// // export const Icons = {
// //   search: SearchIcon,
// //   menu: MenuIcon,
// //   basket: BasketIcon,
// //   logo: LogoIcon,
// // };

// // example of how to use the icons as a component
// // <Icons.search />

// const IconsMap = {
//   assetInspection: AssetInspectionIcon,
//   orderTracking: OrderTrackingIcon,
//   offHire: OffHireIcon,
//   invoices: InvoicesIcon,
//   profile: ProfileIcon,
//   depots: DepotsIcon,
// };

// export type IconName = keyof typeof IconsMap;

// interface IconProps extends SvgProps {
//   name: IconName;
// }

// export const Icons: React.FC<IconProps> = ({ name, ...props }) => {
//   const IconComponent = IconsMap[name];

//   if (!IconComponent) {
//     // eslint-disable-next-line no-console
//     console.warn(`Icon "${name}" not found`);
//     return null;
//   }

//   return <IconComponent {...props} />;
// };

// // example of how to use the icons as a component with name prop
// // <Icons name="search" />

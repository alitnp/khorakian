import { useLocation } from 'react-router-dom';
import { FC, memo, useEffect, useState, ReactElement } from 'react';
import { Popover } from 'antd';
import useHasAccess from 'global/helperFunctions/useHasAccess';
import SubmenuItem from 'components/UI/Menu/components/SubmenuItem';
import MenuItem from 'components/UI/Menu/components/MenuItem';
import SubmenuWrapper from 'components/UI/Menu/components/SubmenuWrapper';
import MenuHoverContentWrapper from 'components/UI/Menu/components/MenuHoverContent';
import MenuHoverItem from 'components/UI/Menu/components/MenuHoverItem';

type submenu = {
  name: string;
  to: string;
  role: boolean;
};
interface ITcMenu {
  name: string;
  icon?: ReactElement;
  to?: string;
  subMenu: submenu[];
  open: boolean;
  role?: boolean;
  horizental: boolean;
}

const TcMenu: FC<ITcMenu> = ({ name, icon, to, subMenu, open, role, horizental }) => {
  //state
  const [isOpen, setIsOpen] = useState(false);

  //hooks
  const { pathname } = useLocation();
  const { hasAccessTo } = useHasAccess();

  //effects
  useEffect(() => {
    if (!subMenu) return;
    setIsOpen(isAnySubMenusSelected());
  }, [pathname]);

  //functions
  const getLinklength = (link?: string) => {
    if (!link) return 0;
    return link.split('/').length - 1;
  };
  const getImportantPartOfPathname = (customLink?: string) => {
    if (!to && !customLink) return;
    const result = pathname.split('/');
    result.shift();
    return result.slice(0, getLinklength(to || customLink)).join('');
  };
  const isAnySubMenusSelected = () => !!subMenu?.some((item) => item?.to?.replaceAll('/', '') === getImportantPartOfPathname(item.to));
  const isSelected = (customLink?: string) => {
    if (customLink) return customLink.replaceAll('/', '') === getImportantPartOfPathname(customLink);
    if (!to) return false;
    return to.replaceAll('/', '') === getImportantPartOfPathname();
  };

  const subMenuItems = () => {
    return subMenu?.map((item, index) => {
      if (!hasAccessTo(item.role)) return;
      return <SubmenuItem key={index} to={item.to} isSelected={isSelected(item.to)} name={item.name} open={open} />;
    });
  };
  const getSubmenuHoverContent = () => {
    if (open) return <></>;
    return (
      <MenuHoverContentWrapper name={name}>
        <>
          {subMenu?.map((item, index) => {
            if (!hasAccessTo(item.role)) return null;
            return <MenuHoverItem key={index} to={item.to} isSelected={isSelected(item.to)} name={item.name} />;
          })}
        </>
      </MenuHoverContentWrapper>
    );
  };
  const subMenuIsEmpty = (items: submenu[]) => {
    if (!items || items?.length === 0) return true;
    return items.every((item) => !hasAccessTo(item.role));
  };

  //conditions
  if (!subMenu && !hasAccessTo(role)) return <></>;
  if (subMenu && subMenuIsEmpty(subMenu)) return <></>;

  if (to) {
    return <MenuItem horizental={horizental} open={open} to={to} isSelected={isSelected()} icon={icon} name={name} />;
  }

  if (subMenu && !open)
    return (
      <Popover overlayStyle={{ position: 'fixed' }} destroyTooltipOnHide content={getSubmenuHoverContent()} placement='left' trigger={'hover'}>
        <div>
          <SubmenuWrapper
            horizental={horizental}
            open={open}
            itemsCount={subMenu.length}
            isWrapperOpen={isOpen}
            setIsWrapperOpen={setIsOpen}
            haveSubmenu={!!subMenu}
            icon={icon}
            name={name}
            submenuSelected={isAnySubMenusSelected()}>
            <> {open && subMenuItems()}</>
          </SubmenuWrapper>
        </div>
      </Popover>
    );
  if (subMenu && open)
    return (
      <div>
        <SubmenuWrapper
          horizental={horizental}
          open={open}
          itemsCount={subMenu.length}
          isWrapperOpen={isOpen}
          setIsWrapperOpen={setIsOpen}
          haveSubmenu={!!subMenu}
          icon={icon}
          name={name}
          submenuSelected={isAnySubMenusSelected()}>
          <> {open && subMenuItems()}</>
        </SubmenuWrapper>
      </div>
    );

  return <></>;
};

export default memo(TcMenu);

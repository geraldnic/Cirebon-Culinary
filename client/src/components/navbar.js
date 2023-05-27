import { useCookies } from 'react-cookie';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import { Link as ReactLink } from 'react-router-dom';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [cookies, setCookies, removeCookies] = useCookies(['access_token']);

  const logout = () => {
    removeCookies('access_token');
    window.localStorage.removeItem('username');
  };

  const loggedOutNavItems = [
    {
      label: 'Cari Rekomendasi',
      href: '/rekomendasi',
    },
    {
      label: 'Makanan Khas',
      href: '/findfood',
    },
    {
      label: 'Tempat Kuliner',
      href: '/findrestaurant',
    },
    {
      label: 'About',
      href: '#',
    },
  ];

  const loggedInNavItems = [
    {
      label: 'Menu Makanan',
      href: '/admin/foodlist',
    },
    {
      label: 'Tempat Kuliner',
      href: '/admin/restaurantlist',
    },
    {
      label: 'Tempat Wisata',
      href: '/admin/touristattractionlist',
    },
    {
      label: 'Admin',
      href: '/admin/userlist',
    },
  ];

  const navItems = cookies.access_token ? loggedInNavItems : loggedOutNavItems;

  return (
    <Box bg="#212529">
      <Flex
        minH={'60px'}
        color="#9B9294"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          {!cookies.access_token ? (
            <Link
              _hover={{
                textDecoration: 'none',
              }}
            >
              <ReactLink to="/">
                <Text
                  fontFamily={'heading'}
                  fontWeight={'bold'}
                  color="#FF001F"
                >
                  Rekomendasi Kuliner Cirebon
                </Text>
              </ReactLink>
            </Link>
          ) : (
            <Link
              _hover={{
                textDecoration: 'none',
              }}
            >
              <ReactLink to="/admin">
                <Text
                  fontFamily={'heading'}
                  fontWeight={'bold'}
                  color="#FF001F"
                >
                  Rekomendasi Kuliner Cirebon
                </Text>
              </ReactLink>
            </Link>
          )}
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav navItems={navItems} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {!cookies.access_token ? (
            <>
              <ReactLink to={'/auth?mode=signin'}>
                <Button
                  as={'a'}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                >
                  Admin
                </Button>
              </ReactLink>
            </>
          ) : (
            <Link>
              <ReactLink to={'/'}>
                <Button onClick={logout}>Logout</Button>
              </ReactLink>
            </Link>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ navItems }) => {
  const linkColor = '#9B9294';
  const linkHoverColor = '#BEB2B5';
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems &&
        navItems.map(navItem => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Link
                  p={2}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  <ReactLink to={navItem.href ?? '#'}>
                    {navItem.label}
                  </ReactLink>
                </Link>
              </PopoverTrigger>

              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}
                >
                  <Stack>
                    {navItem.children.map(child => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <ReactLink to={href}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'pink.400' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </ReactLink>
    </Link>
  );
};

const MobileNav = ({ navItems }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {navItems &&
        navItems.map(navItem => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ReactLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2}>
                <ReactLink to={child.href}>{child.label}</ReactLink>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

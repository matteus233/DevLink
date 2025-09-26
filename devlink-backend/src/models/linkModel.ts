import crypto from 'crypto';

export interface Link {
  id: string;
  userId: string;
  title: string;
  url: string;
}

export const links: Link[] = [];

export const createLink = (linkData: Omit<Link, 'userId'>): Link => {
  const newLink: Link = {
    userId: crypto.randomUUID(),
    ...linkData,
  };
  links.push(newLink);
  return newLink;
};

export const getLinksByUserId = (userId: string): Link[] => {
  return links.filter((link) => link.userId === userId);
};

export const deleteLink = (id: string, userId: string): boolean => {
  const index = links.findIndex(
    (link) => link.id === id && link.userId === userId
  );
  if (index !== -1) {
    links.splice(index, 1);
    return true;
  }
  return false;
};

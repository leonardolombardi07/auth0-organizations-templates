import ApiInstance from "../instance";

function getOrganization(id: string) {
  return ApiInstance.get(`/organizations/${id}`);
}

export { getOrganization };

import ENS from "ethereum-ens";

export async function resolveEnsAddress(provider, name) {
  const ens = new ENS(provider);
  const address = await ens.resolver(name).addr();
  try {
    debugger;
    return address;
  } catch (error) {
    return error;
  }
}

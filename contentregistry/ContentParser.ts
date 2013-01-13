/**
 * Created with IntelliJ IDEA.
 * User: UberMouse
 * Date: 13/01/13
 * Time: 18:43
 * To change this template use File | Settings | File Templates.
 */
interface ContentParser {
    name(): string;
    matches(url: string): bool;
}
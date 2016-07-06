
// MemSQL Column Compiler
// -------
import inherits from 'inherits';
import ColumnCompiler from '../../mysql/schema/columncompiler';

import { assign, extend } from 'lodash'

function ColumnCompiler_MemSQL() {
  ColumnCompiler.apply(this, arguments);
}
inherits(ColumnCompiler_MemSQL, ColumnCompiler);

extend(ColumnCompiler_MemSQL.prototype, {

  compileColumn() {
    // inhibit normal ddl `name type` statement for computed fields
    if (this.modified.computed) {
      const definition = this.modified.computed;
      delete this.modified.computed;
      return this.formatter.wrap(this.getColumnName()) + ' as ' +
        definition + ' persisted ' +
        this.getColumnType();
    } else {
      return ColumnCompiler.prototype.compileColumn.call(this);
    }
  },

  json: 'json',

})

export default ColumnCompiler_MemSQL;

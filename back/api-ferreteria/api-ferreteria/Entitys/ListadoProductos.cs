using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;

namespace api_ferreteria.Entitys
{
    public class ListadoProductos
    {
        public int id { get; set; }
        public string nombre { get; set; }

        public string descripcion { get; set; }

        public int stock { get; set; }
 
        public bool estado { get; set; }

        public decimal precio { get; set; }

        public string nombreCategoria { get; set; }

    }
}

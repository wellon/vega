using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Models.DTO
{
    public class MakeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }

        public MakeDto()
        {
            Models = new Collection<Model>();
        }
    }
}